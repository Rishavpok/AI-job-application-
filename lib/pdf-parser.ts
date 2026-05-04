import fs from "fs";
import os from "os";
import path from "path";
import PDFParser from "pdf2json";

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Save buffer as temp file
  const tempPath = path.join(os.tmpdir(), `resume-${Date.now()}.pdf`);
  fs.writeFileSync(tempPath, buffer);

  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on("pdfParser_dataReady", () => {
      const text = pdfParser.getRawTextContent();
      fs.unlinkSync(tempPath); // delete temp file
      resolve(text);
    });

    pdfParser.on("pdfParser_dataError", (err: any) => {
      fs.unlinkSync(tempPath);
      reject(err);
    });

    pdfParser.loadPDF(tempPath);
  });
};