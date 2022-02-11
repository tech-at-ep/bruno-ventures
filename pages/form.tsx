import styles from "../styles/Form.module.css";
import firebaseApp from "../util/firebaseApp";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  createRef,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Modal from "@mui/material/Modal";
import ReactCrop, { Crop } from "react-image-crop";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { ConstructionOutlined } from "@mui/icons-material";
import { useAuth } from "../util/firebaseAuthHelpers";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import SplashScreen from "../util/splashscreen";

interface CardProps {
  accentColor: string;
  setAccentColor: Dispatch<SetStateAction<string>>;
  resetForm: Dispatch<SetStateAction<boolean>>;
  isSubmitted: boolean;
  setProcessing: Dispatch<SetStateAction<boolean>>;
  setAlreadyApplied: Dispatch<SetStateAction<boolean>>;
}

function ValidateApp(app: Application): string {
  const keysMap: Record<string, string> = {
    name: "Startup name",
    website: "Website link",
    year: "Founding year",
    mission: "Company Description/ Mission Statement",
    imageData: "Logo",
  };

  const socials = [
    "twitter",
    "facebook",
    "instagram",
    "linkedin",
    "accentColor",
  ];
  let error = "";
  let errFound = false;
  Object.entries(app).forEach(([key, value]) => {
    if (value === "" && !socials.some((a) => a === key)) {
      let field = key.charAt(0).toUpperCase() + key.slice(1);
      if (key in keysMap) {
        field = keysMap[key];
      }
      if (!errFound) {
        error = field + " must not be empty";
        errFound = true;
      }
    }
  });
  if (error != "") {
    return error;
  }

  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailFormat.test(app.email.toLowerCase())) {
    return "Must submit a valid email";
  }

  const urlFormat = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  if (!urlFormat.test(app["website"])) {
    return "Must submit a valid website";
  }

  if (
    app["twitter"] === "" &&
    app["instagram"] === "" &&
    app["facebook"] === "" &&
    app["linkedin"] === ""
  ) {
    return "Must submit at least one social media handle";
  }

  if (
    app["facebook"] !== "" &&
    !app["facebook"].includes("https://www.facebook.com/")
  ) {
    return "If submitting a Facebook, you Must submit the entire link to your page";
  }

  if (
    app["linkedin"] !== "" &&
    !app["linkedin"].includes("https://www.linkedin.com/")
  ) {
    return "If submitting a LinkedIn, you Must submit the entire link to your page";
  }

  if (isNaN(parseInt(app["year"]))) {
    return "Must submit a valid founding year (e.g. 2020)";
  }

  return error;
}

const empty = {
  name: "",
  founders: "",
  email: "",
  website: "",
  twitter: "",
  instagram: "",
  facebook: "",
  linkedin: "",
  mission: "",
  year: "",
  industry: "",
  accentColor: "",
  imageData: "",
  approved: false,
};

function Card({
  setAccentColor,
  resetForm,
  isSubmitted,
  accentColor,
  setProcessing,
  setAlreadyApplied,
}: CardProps) {
  const functions = getFunctions(firebaseApp);
  const addStartUp = httpsCallable(functions, "addStartUp");
  const uploadPictureFromB64 = httpsCallable(functions, "uploadPictureFromB64");
  const setImageURL = httpsCallable(functions, "setImageURL");
  const titleColor =
    perceievedLuminance(hexToRgb(accentColor)) > 220 ? "#000000" : "#ffffff";
  const [app, updateApp] = useState<Application>(empty);

  const setProperty = (property: string, value: string) => {
    updateApp({
      ...app,
      [property]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const error = ValidateApp(app);
    if (error === "") {
      setProcessing(true);
      const storage = getStorage();
      let tempApp = { ...app };
      tempApp.imageData = "";
      const startupResponse = await addStartUp({ app: tempApp });
      // this is shit typescript but i just need this to work lol
      const id = (startupResponse as any).data.id;
      const imageRef = ref(storage, `images/${id}`);
      await uploadString(imageRef, app.imageData, "data_url");
      const finalizeUpload = async () => {
        try {
          const dlURL = await getDownloadURL(imageRef);
          console.log("image found, stopping loop");
          await setImageURL({ id: id, imageUrl: dlURL });
          setProcessing(false);
          setAlreadyApplied(true);
          toast.success("Your application was submitted successfully!");
          reset();
        } catch {
          setTimeout(() => finalizeUpload(), 1000);
        }
      };
      finalizeUpload();
    } else {
      toast.error(error);
    }
  };

  const reset = () => {
    updateApp(empty);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
      (textarea) => (textarea.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "")
    );
    resetForm(true);
  };

  return (
    <div className={styles.form_card}>
      <div className={styles.form_card_header}>List Your Startup</div>
      <div className={styles.form_body}>
        <TextForm setProperty={setProperty} />
        <LogoForm
          setAccentColor={setAccentColor}
          setProperty={setProperty}
          isSubmitted={isSubmitted}
        />
        <div className={styles.padding}>
          <button
            className={styles.button}
            onClick={handleSubmit}
            style={{ background: accentColor, color: titleColor }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

type Application = {
  name: string;
  founders: string;
  email: string;
  website: string;
  twitter: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  mission: string;
  year: string;
  industry: string;
  accentColor: string;
  imageData: string;
  approved: boolean;
};

const options = [
  // { value: "", label: "Select your Industry" },
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Finance", label: "Finance" },
  { value: "Environment", label: "Environment" },
  { value: "Software", label: "Software" },
  { value: "Social Entrepreneurship", label: "Social Entrepreneurship" },
];

interface TextFormProps {
  setProperty: (arg0: string, arg1: string) => void;
  // addItem : () => void;
}

function TextForm({ setProperty }: TextFormProps) {
  return (
    <div className={`${styles.text_form_container}`}>
      <form>
        <label> startup name:</label>
        <input
          className={styles.input}
          placeholder="Startup Name"
          type="text"
          name="name"
          onChange={(e) => setProperty("name", e.target.value)}
        ></input>
        <label> founders:</label>
        <input
          className={styles.input}
          placeholder="Founders"
          type="text"
          name="founders"
          onChange={(e) => setProperty("founders", e.target.value)}
        ></input>
        <label> emails:</label>
        <input
          className={styles.input}
          placeholder="Email"
          type="email"
          name="emails"
          onChange={(e) => setProperty("email", e.target.value)}
        ></input>
        <label> website:</label>
        <input
          className={styles.input}
          placeholder="Website Link"
          type="text"
          name="website"
          onChange={(e) => setProperty("website", e.target.value)}
        ></input>
        <label> social media handles:</label>
        <div className={styles.socials}>
          <input
            className={styles.handle}
            placeholder="Twitter"
            type="text"
            name="handles"
            onChange={(e) => {
              if (e.target.value.length == 0) {
                e.target.value == "";
              } else if (e.target.value[0] !== "@") {
                e.target.value = "@" + e.target.value;
              }
              setProperty("twitter", e.target.value);
            }}
          />
          <input
            className={styles.handle}
            placeholder="Facebook"
            type="text"
            name="handles"
            onChange={(e) => setProperty("facebook", e.target.value)}
          ></input>
          <input
            className={styles.handle}
            placeholder="Instagram"
            type="text"
            name="handles"
            onChange={(e) => {
              if (e.target.value.length == 0) {
                e.target.value == "";
              } else if (e.target.value[0] !== "@") {
                e.target.value = "@" + e.target.value;
              }
              setProperty("instagram", e.target.value);
            }}
          />
          <input
            className={styles.handle}
            placeholder="Linkedin"
            type="text"
            name="handles"
            onChange={(e) => setProperty("linkedin", e.target.value)}
          ></input>
        </div>

        <label> mission statement:</label>
        <textarea
          className={styles.textarea}
          placeholder="Company Description / Mission Statement"
          name="mission"
          onChange={(e) => setProperty("mission", e.target.value)}
        ></textarea>
        <div className={styles.socials}>
          <label> founding year:</label>
          <input
            className={styles.handle}
            placeholder="Founding Year"
            type="text"
            name="year"
            onChange={(e) => setProperty("year", e.target.value)}
          ></input>
          <label> industry:</label>
          <select
            required
            className={styles.select}
            placeholder="Select"
            name="industry"
            onChange={(e) => setProperty("industry", e.target.value)}
          >
            <option value="">Select Your Industry</option>
            {options.map(({ value, label }, index) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

type VectorProps = {
  accentColor: string;
};

function FirstVector({ accentColor }: VectorProps) {
  return (
    <svg
      className={`${styles.top_left_vector}  ${styles.noselect} ${styles.nodrag}`}
      width="581"
      height="760"
      viewBox="0 0 581 760"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M194.796 -60.6554L501.485 287.537L-34.3108 759.468L-341 411.276L194.796 -60.6554Z"
        fill={accentColor}
      />
      <path
        d="M501.485 287.537C405.334 372.227 258.734 362.936 174.044 266.785C89.3542 170.635 98.645 24.0345 194.796 -60.6554C290.946 -145.345 437.546 -136.055 522.236 -39.904C606.926 56.2466 597.635 202.847 501.485 287.537Z"
        fill={accentColor}
      />
    </svg>
  );
}

function SecondVector({ accentColor }: VectorProps) {
  return (
    <svg
      className={`${styles.bottom_right_vector}  ${styles.noselect} ${styles.nodrag}`}
      width="636"
      height="754"
      viewBox="0 0 636 754"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M368.962 794.473L96.9548 418.563L675.402 -4.19617e-05L947.409 375.91L368.962 794.473Z"
        fill={accentColor}
      />
      <path
        d="M96.9548 418.563C200.759 343.45 345.801 366.71 420.913 470.514C496.026 574.319 472.767 719.36 368.962 794.473C265.158 869.585 120.116 846.326 45.0037 742.521C-30.1091 638.717 -6.84975 493.676 96.9548 418.563Z"
        fill={accentColor}
      />
    </svg>
  );
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: 0,
        g: 0,
        b: 0,
      };
}

function perceievedLuminance(color: RGB): number {
  return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
}

interface LogoFormProps {
  setAccentColor: Dispatch<SetStateAction<string>>;
  setProperty: (arg0: string, arg1: string) => void;
  isSubmitted: boolean;
}

function LogoForm({ setAccentColor, setProperty, isSubmitted }: LogoFormProps) {
  const fileInputRef = createRef<HTMLInputElement>();
  const colorInputRef = createRef<HTMLInputElement>();

  const [image, setImage] = useState<string>("");
  const [accentColor, setLocalAccentColor] = useState<string>("#FF5A5F");
  const [_uploadedFile, setUploadedFile] = useState<File>();
  const [cropped, setCropped] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    if (cropped) {
      setModalOpen(false);
    }
  };

  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    height: 0,
    unit: "%",
    width: 0,
    aspect: 1,
  });
  const [imageElt, setImageElt] = useState<HTMLImageElement | undefined>(
    undefined
  );
  const [croppedImageData, setCroppedImageData] = useState("");

  // useEffect(() => {
  //   if (isSubmitted) {
  //     setLocalAccentColor("#FF5A5F");
  //     setImage("");
  //   }
  // });

  const getCroppedImage = (crop: Crop) => {
    if (!imageElt) {
      return;
    }
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = imageElt.naturalWidth / imageElt.width;
    const scaleY = imageElt.naturalHeight / imageElt.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imageElt,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    setCroppedImageData(canvas.toDataURL("image/jpeg"));
  };

  const onLogoUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    setUploadedFile(event.target.files[0]);
    let reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      if (ev.target?.result != null) {
        setImage(ev.target.result.toString());
        setProperty("imageData", ev.target.result.toString());
      }
      handleOpen();
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const logoOnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const colorOnClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <div className={styles.logo_form}>
      <Modal open={modalOpen} onClose={handleClose}>
        <div className={styles.upload_modal}>
          <div className={styles.modal_box} onClick={() => setCropped(true)}>
            <ReactCrop
              src={image}
              crop={crop}
              ruleOfThirds
              onImageLoaded={(newElt) => {
                setCropped(false);
                setCrop({
                  x: 0,
                  y: 0,
                  height: 0,
                  unit: "%",
                  width: 0,
                  aspect: 1,
                });
                setImageElt(newElt);
                if (newElt.parentElement) {
                  let height = 50;
                  let width = 50;
                  if (newElt.naturalHeight > newElt.naturalWidth) {
                    width = (newElt.naturalWidth / newElt.naturalHeight) * 50;
                  } else {
                    height = (newElt.naturalHeight / newElt.naturalWidth) * 50;
                  }
                  newElt.parentElement.style.height = height + "vh";
                  newElt.parentElement.style.width = width + "vh";
                }
              }}
              onComplete={getCroppedImage}
              onChange={(newcrop) => setCrop(newcrop)}
              imageStyle={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div>
            <button
              className={styles.button}
              onClick={() => {
                if (cropped) {
                  setImage(croppedImageData);
                  setProperty("imageData", croppedImageData);
                  handleClose();
                } else {
                  toast.info(
                    "Drag on the image or adjust an existing crop box to crop!",
                    {
                      autoClose: 5000,
                      hideProgressBar: false,
                      position: "top-center",
                      closeOnClick: true,
                      progress: undefined,
                      draggable: true,
                      pauseOnHover: true,
                    }
                  );
                }
              }}
              style={{
                background: "#FF5A5F",
                color: "#FFFFFF",
                fontFamily: "Inter",
              }}
            >
              Crop Logo
            </button>
          </div>
        </div>
      </Modal>
      <div className={styles.logo_selector} onClick={logoOnClick}>
        <div
          className="image_upload_text"
          style={image == "" ? { marginBottom: "0.5rem" } : { display: "none" }}
        >
          {" "}
          Upload your Logo
        </div>
        {image == "" ? (
          <div>
            <img
              style={image == "" ? { opacity: "70%" } : { display: "none" }}
              src="/upload_24px.png"
            />
          </div>
        ) : (
          <div>
            <img
              style={{ maxHeight: "9.5rem", maxWidth: "9.5rem" }}
              src={image}
            />
          </div>
        )}
        <input
          type="file"
          style={{
            opacity: 0.0,
            position: "absolute",
            top: 0,
            left: -500000, // hide file input off screen to use my styled div
          }}
          ref={fileInputRef}
          onChange={onLogoUploaded}
        />
      </div>
      <div className={styles.color_selector} onClick={colorOnClick}>
        <div>Select an Accent Color</div>
        <div
          className={styles.color_box}
          style={{
            backgroundColor: accentColor,
          }}
        />
        <input
          type="color"
          style={{
            opacity: 0,
            cursor: "pointer",
          }}
          onChange={(event) => {
            if (event.target?.value) {
              setLocalAccentColor(event.target.value);
              setAccentColor(event.target.value);
              setProperty("accentColor", event.target.value);
            }
          }}
          ref={colorInputRef}
        />
      </div>
    </div>
  );
}

export default function Form() {
  const [accentColor, setAccentColor] = useState<string>("#FF5A5F");
  const titleColor =
    perceievedLuminance(hexToRgb(accentColor)) > 220 ? "#000000" : "#ffffff";

  const [processing, setProcessing] = useState(false);
  const [isSubmitted, resetForm] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  const StopLoading = () => {
    setFading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  setTimeout(StopLoading, 2000);

  useEffect(() => {
    const checkApplied = async () => {
      const db = getFirestore(firebaseApp);
      const appsCol = collection(db, "apps");
      console.log(user?.email);
      const appQuery = query(
        appsCol,
        where("applicant", "==", user ? user.email : "")
      );
      const appsSnapshot = await getDocs(appQuery);
      const appsList = appsSnapshot.docs.map((doc) => doc.data());
      console.log(appsList);
      if (appsList.length > 0) {
        setAlreadyApplied(true);
      }
    };
    if (isAuthenticated) {
      checkApplied();
    }
    // if (isSubmitted) {
    //   setAccentColor("#FF5A5F");
    // }
    if (loading) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
    }
    loading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  });

  return (
    <div>
      {loading && <SplashScreen fading={fading} />}
      {isAuthenticated ? (
        !alreadyApplied ? (
          <div
            className={styles.form_container}
            style={{ position: "relative" }}
          >
            <LoadingOverlay
              active={processing}
              spinner={true}
              text="Sit tight while we process your application."
              styles={{ wrapper: { height: "100%" } }}
            />

            <FirstVector accentColor={accentColor} />
            <SecondVector accentColor={accentColor} />
            <div className={styles.form_title} style={{ color: titleColor }}>
              <div style={{ marginBottom: "0px", paddingTop: "2rem" }}>
                Welcome to
              </div>
              <div style={{ marginTop: "-0.7rem" }}>Bruno Ventures.</div>
            </div>
            <div className={`${styles.container}`}>
              <Card
                setAccentColor={setAccentColor}
                accentColor={accentColor}
                resetForm={resetForm}
                isSubmitted={isSubmitted}
                setProcessing={setProcessing}
                setAlreadyApplied={setAlreadyApplied}
              />
            </div>
          </div>
        ) : (
          <div className="p-4 font-semibold">
            Thank you for submitting your company to Bruno Ventures! Our team is
            currently reviewing your application.
          </div>
        )
      ) : (
        <div className="p-4 font-semibold">
          Sign in with your Brown email to access the application form.
        </div>
      )}
    </div>
  );
}
