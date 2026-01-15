import * as XLSX from "xlsx";
import { VocabularyWord } from "@/types/vocabulary";

interface ParseResult {
  success: boolean;
  words: VocabularyWord[];
  filename?: string;
  error?: string;
}

export async function parseExcelFile(file: File): Promise<ParseResult> {
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {
      header: 1,
    });
    
    if (jsonData.length < 2) {
      return {
        success: false,
        words: [],
        error: "File must have at least a header row and one data row",
      };
    }
    
    // Skip header row
    const words: VocabularyWord[] = jsonData.slice(1).map((row, index) => {
      const [chinese, pinyin, english] = row;
      return {
        id: `imported_${Date.now()}_${index}`,
        chinese: chinese?.toString() || "",
        pinyin: pinyin?.toString() || "",
        english: english?.toString() || "",
        favorite: false,
        correctCount: 0,
        incorrectCount: 0,
      };
    }).filter((word) => word.chinese && word.english);
    
    if (words.length === 0) {
      return {
        success: false,
        words: [],
        error: "No valid vocabulary found. Expected columns: Chinese, Pinyin, English",
      };
    }
    
    return {
      success: true,
      words,
      filename: file.name.replace(/\.[^/.]+$/, ""),
    };
  } catch (error) {
    console.error("Excel parsing error:", error);
    return {
      success: false,
      words: [],
      error: "Failed to parse Excel file. Please check the format.",
    };
  }
}
