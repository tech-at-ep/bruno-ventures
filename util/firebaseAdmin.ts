import admin, { ServiceAccount } from "firebase-admin";

const debugging = {
  type: "service_account",
  project_id: "bruno-ventures-dev",
  private_key_id: "05a0e0576cdae578d1c8dba143f927bc0c45d04f",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCCTyZ9UrHELE35\nmRmY8Tf/ms5SAtjrOFyFF3bSLHB2HmqodhMWLSO547PtUS9upeVutQGBd+T4gOu1\nDkwvQlLnQlzDoEV+Ri9e1RlXoa8qhZnPGtRqiumJ+6o6SUx7+P3Tr9UCuYnOuFv9\nW9iw0jbuAj+WwLWMVRE3bt4Ln7Uc0rauSaX7Cvb0njjRkJti2BJdyqc7Ca56GRRe\nBbo4d95KC6BXf3r5mD1+mKKXP7dAiUSHrHptzoUAt2R5xI+c0zJGfDMDhEXX8kDY\n7TsEmyr/0nmjIUM4GF7+FhPFV5fDBDzN5pLVCk/HM0ChyJAztjxgm4T0P4UaSLy7\n48zG3MALAgMBAAECggEAJnrrGc0Gs7CFojRky7ZH3BJB5RP0LJnrMF46d1wqJadb\nxb2Aa2cPCsDEDEuSHzGcK/IFrM7T7dJcSI4dT0Ndqe7958L3Yo+lQ3LYVfln+b2U\nKwV4PrIgvt9zaFzm2iEwC4f79h8GI+ZrO8kYlzasg+JkFsd3lSY1vFHf/jy+RfFD\no82ZHs7AOHSb9L2nbJUzu/peQI7lXkSByH5qL577YsXY6x9BPbKO+ELByeTen2bl\nIxNJ8VrIuPMKX04Gc+95m1ciUAkwy62yAs6SqpqDbi147b/WJJB+QyygAOK2VWqI\npwVuqTbtwYeFQS64RBss9lECOE4jBJ91aRCaskwLKQKBgQC3MexWzR6Q0dx/sbEt\nL/7oNM7Vn8O78nHvWD8FSi3oPOpqjNggarGbz7ADqEZrdsYKFLuwCs4wQX1usjg5\nr3D7PBpj5aGvY0mVS3q1o+UceENnCxCjh+F/bYQWO2JTlIWkmPDhJQLbKgez+tuv\nwZgTv9cF4uWaRtvRZ5VBpL8D/QKBgQC2GKz7ajEJzVil90FGdXSxxTeh5PbK3tOa\nXhHpZ8/GVAPch62vY7biF6anC/y3GkmQYMKBfgrzuUOFBSU2xqqeE0ZQEtHldF/k\n6lbeToia6+ugg3IaDfcoHG47oyJzNIc337EBdOfeHSIlsJhiUeAhzyG/AeV0UfG6\nJ3oou2eepwKBgG9XkGVRVfp/Ep0pyp3ERhGrxupfp/9bY5Qs9mCorS4xl+gaomFR\nd5FTsY8Hf4VhMwx9fXWJm7gIlcvp1fJ5hxmrdf6xWovWtKpgrbwoWN/s2EqQlxRN\nSejBDz7T6PcTlgZsTjsI26uI6BWjqlIwP9YBCxcwyIvz9TZY1oaHMvGhAoGAHoqk\n+MYm024NoEiIOjkZCXf6jLzKZ9xXwVxlxLAUuT7+Js7a4r/mvKUa3om0KUHPdNfF\nx9JMI/S+zmC+jSFlHH4/HM8LRWDvdIWZbE/fuZw4OQPS72vIOIIMOxRxgsEcrNJn\n7cad3TMltwyXgmYZIZKMJm06/vd/g6l7Y7mK96ECgYBqK6xBn9UV2htnLPxu8T/X\niN8WtKxMEvReMMEqllaIITVzyAyjA1N1k7ES6gZznFW2PKrF60J1ypNO4OB8fxAo\nQaJxLkZaTgZNDRHir2GKZR+O59bJ8zWV/siLGhiw3V6mg/2PCbhZdKIjkK3UiulY\np3E1yFpQVPi9+1v9U30B0w==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-jcns7@bruno-ventures-dev.iam.gserviceaccount.com",
  client_id: "118303663464547266552",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jcns7%40bruno-ventures-dev.iam.gserviceaccount.com",
};

const credentials: ServiceAccount = {
  projectId: debugging.project_id,
  privateKey: debugging.private_key,
  clientEmail: debugging.client_email,
};

try {
  admin.initializeApp({ credential: admin.credential.cert(credentials) });
} catch (error) {
  console.error("Firebase admin initialization error", error);
}
export default admin;
