import fs from "fs";
import { Collection, Document, ModifyResult, ObjectId, WithId } from "mongodb";

export class ImagesModel {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  deleteImages = async (_id: string): Promise<boolean> => {
    const directory = `./images/${_id}`;
    if (!fs.existsSync(directory)) return false;

    fs.rmSync(directory, { recursive: true, force: true });

    return true;
  };

  editImages = async (
    _id: string,
    imagesToKeep: string[],
  ): Promise<boolean> => {
    const directory = `./images/${_id}`;
    if (!fs.existsSync(directory)) return false;

    const files: string[] = fs.readdirSync(`images/${_id}`);
    for (const file of files) {
      if (!imagesToKeep.includes(file)) fs.rmSync(`${directory}/${file}`);
    }

    return true;
  };

  getArticle = async (_id: string): Promise<WithId<Document> | null> => {
    return await this.collection.findOne({
      _id: ObjectId.createFromHexString(_id),
    });
  };

  updateArticle = async (_id: string): Promise<ModifyResult> => {
    const url: string = `http://localhost:8484/images/${_id}`;
    const files: string[] = fs.readdirSync(`images/${_id}`);

    const images: string[] = files.map((filename): string => {
      return `${url}/images/${_id}/${filename}`;
    });

    return await this.collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(_id) },
      {
        $set: { images: images },
      },
      { returnDocument: "after" },
    );
  };
}
