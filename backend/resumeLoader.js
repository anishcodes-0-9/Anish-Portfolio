import fs from "fs";
import PDFParser from "pdf2json";

export async function loadResume() {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => {
      console.error("❌ Resume parsing failed:", err);
      resolve("Resume could not be loaded.");
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((textItem) => {
          text += decodeURIComponent(textItem.R[0].T) + " ";
        });
      });

      resolve(text);
    });

    pdfParser.loadPDF("./Anish_Krishnan_Resume.pdf");
  });
}
