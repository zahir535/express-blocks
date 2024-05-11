import * as admin from "firebase-admin";
import { Request, Response } from "express";

require("dotenv").config();

const client_email = process.env.client_email;
const project_id = process.env.project_id;
const private_key = process.env.private_key;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: project_id,
    privateKey: private_key.replace(/\\n/g, "\n"),
    clientEmail: client_email,
  }),
});

export const middlewareAuth = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { authorization } = req.headers;

  let token = "";
  if (
    typeof authorization === "string" &&
    authorization.startsWith("Bearer ")
  ) {
    token = authorization.substring(7, authorization.length);
  }

  admin
    .auth()
    .verifyIdToken(token)
    .then((val) => {
      // if success, return a val, if not valid token, reject the promise
      if (val) {
        next();
      }
    })
    .catch(() => {
      // will throw error or reject promise if not valid token
      //Stop the user progressing any further
      return res.status(400).send("Middleware Failed");
    });
};
