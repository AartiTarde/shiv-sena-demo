export type Language = "en" | "mr" | "hi";

export interface Translations {
  // Navigation
  searchByEpic: string;
  searchByDetails: string;
  addedAfterVS: string;
  deletedAfterVS: string;
  doubleVoters: string;
  
  // Voter Card Labels
  ward: string;
  epicNo: string;
  serialNo: string;
  age: string;
  gender: string;
  name: string;
  relativeName: string;
  partNo: string;
  partName: string;
  pollingStation: string;
  
  // Search Page
  searchOptions: string;
  clickToSearch: string;
  
  // Common
  selectAssembly: string;
  search: string;
  exportExcel: string;
  showing: string;
  results: string;
  result: string;
  noVotersFound: string;
  
  // Gender
  male: string;
  female: string;
  other: string;
}

const translations: Record<Language, Translations> = {
  en: {
    searchByEpic: "Search by EPIC",
    searchByDetails: "Search by Details",
    addedAfterVS: "Added After VS",
    deletedAfterVS: "Deleted After VS",
    doubleVoters: "Double Voters",
    ward: "Ward",
    epicNo: "EPIC NO",
    serialNo: "Serial No.",
    age: "Age",
    gender: "Gender",
    name: "Name",
    relativeName: "Relative name",
    partNo: "Part No",
    partName: "Part Name",
    pollingStation: "Polling Station",
    searchOptions: "Search Options",
    clickToSearch: "Click to search",
    selectAssembly: "Select Assembly",
    search: "SEARCH",
    exportExcel: "Export Excel",
    showing: "Showing",
    results: "results",
    result: "result",
    noVotersFound: "No voters found matching your search criteria",
    male: "Male",
    female: "Female",
    other: "Other",
  },
  mr: {
    searchByEpic: "EPIC द्वारे शोधा",
    searchByDetails: "तपशीलानुसार शोधा",
    addedAfterVS: "VS नंतर जोडले",
    deletedAfterVS: "VS नंतर हटवले",
    doubleVoters: "दुहेरी मतदार",
    ward: "वॉर्ड",
    epicNo: "EPIC क्रमांक",
    serialNo: "अनुक्रमांक",
    age: "वय",
    gender: "लिंग",
    name: "नाव",
    relativeName: "नातेवाईकाचे नाव",
    partNo: "भाग क्रमांक",
    partName: "भाग नाव",
    pollingStation: "मतदान केंद्र",
    searchOptions: "शोध पर्याय",
    clickToSearch: "शोधण्यासाठी क्लिक करा",
    selectAssembly: "विधानसभा निवडा",
    search: "शोधा",
    exportExcel: "Excel निर्यात करा",
    showing: "दर्शवित आहे",
    results: "निकाल",
    result: "निकाल",
    noVotersFound: "आपल्या शोध निकषांशी जुळणारे मतदार सापडले नाहीत",
    male: "पुरुष",
    female: "स्त्री",
    other: "इतर",
  },
  hi: {
    searchByEpic: "EPIC से खोजें",
    searchByDetails: "विवरण से खोजें",
    addedAfterVS: "VS के बाद जोड़ा गया",
    deletedAfterVS: "VS के बाद हटाया गया",
    doubleVoters: "दोहरे मतदाता",
    ward: "वार्ड",
    epicNo: "EPIC संख्या",
    serialNo: "क्रम संख्या",
    age: "उम्र",
    gender: "लिंग",
    name: "नाम",
    relativeName: "रिश्तेदार का नाम",
    partNo: "भाग संख्या",
    partName: "भाग नाम",
    pollingStation: "मतदान केंद्र",
    searchOptions: "खोज विकल्प",
    clickToSearch: "खोजने के लिए क्लिक करें",
    selectAssembly: "विधानसभा चुनें",
    search: "खोजें",
    exportExcel: "Excel निर्यात करें",
    showing: "दिखा रहा है",
    results: "परिणाम",
    result: "परिणाम",
    noVotersFound: "आपकी खोज मानदंडों से मेल खाने वाले मतदाता नहीं मिले",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}

