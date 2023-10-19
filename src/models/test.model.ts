import mongoose, { Document, Model, Schema } from "mongoose";

interface ITest extends Document {
  name: string;
  age: number;
}
const TestSchema: Schema = new mongoose.Schema<ITest>({
  name: String,
  age: Number,
});

const TestModel: Model<ITest> =
  mongoose.models.test || mongoose.model<ITest>("test", TestSchema);

export default TestModel;
