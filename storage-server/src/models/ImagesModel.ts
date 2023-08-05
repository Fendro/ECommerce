import fs from "fs";
import { Collection, Document, ModifyResult, ObjectId, WithId } from "mongodb";

export class ImagesModel {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  deleteImages = async (_id: string): Promise<number> => {
    const { deletedCount } = await this.collection.deleteOne({
      _id: ObjectId.createFromHexString(_id),
    });

    return deletedCount;
  };

  editImages = async (
    _id: string,
    fieldsToUpdate: { [key: string]: any },
  ): Promise<ModifyResult> => {
    return await this.collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(_id) },
      {
        $set: fieldsToUpdate,
      },
      { returnDocument: "after" },
    );
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
    );
  };
}
