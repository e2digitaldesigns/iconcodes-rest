import { connect } from "mongoose";

const localUri = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}?readPreference=primary&directConnection=true&ssl=false`;

const remoteUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clustercodes.ol6ntjj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const uri = process.env.NODE_ENV === "production" ? remoteUri : localUri;

export const dbConnector = async () => {
  await connect(uri, {}).then(
    () => {
      console.log(`Step 02) Server is now connected to ${process.env.DB_NAME} DB`);
    },
    err => {
      console.error(err);
    }
  );
};
