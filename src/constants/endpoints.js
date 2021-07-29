const localhost = "http://localhost:5000";
const server = "http://api.azure.dev.knapshot.co"; //azure dev
const production = "https://api.azure.knapshot.co"; //azure prodcution

const baseUrl = localhost;

//user
const Login = baseUrl + "/user/sign-in";
const Reset = baseUrl + "/user/reset";
const ResetPassword = baseUrl + "/user/resetPassword";
const UserCreate = baseUrl + "/user/create";
const GetUsers = baseUrl + "/user/getAllUserWithCompany";
const GetUserById = baseUrl + "/user/getUserById";
const userIds = baseUrl + "/user/delete";
const confirmUser = baseUrl + "/user/confirm";
const GetUserEmail = baseUrl + "/user/getEmail";

//companies
const getAllCompanies = baseUrl + "/companies";
const getCompanyByFilter = baseUrl + "/companiesByFilter";
const searchCompanies = baseUrl + "/companies/search";
const getAllDatasets = baseUrl + "/companies/datasets";
const getCompanyByName = baseUrl + "/companies/name";
const deleteCompany = baseUrl + "/companies/delete";
const deleteAllCompanies = baseUrl + "/companies/deleteAll";
const getAllLocations = baseUrl + "/companies/getAllLocations";
const getGeoData = baseUrl + "/companies/getGeoData";
const getFilenames = baseUrl + "/companies/getFilenames";
const getCompanyByMultiIDs = baseUrl + "/getCompanyByMultiIDs";
const getFileNamesFromDB = baseUrl + "/getFileNamesFromDB";
const updateFileNamesFromDB = baseUrl + "/updateFileNamesFromDB";
const updateScore = baseUrl + "/updateScore";

//search
const searchCompany = baseUrl + "/companies/search/engine";
const searchCompanyStatus = baseUrl + "/companies/search/engineStatus";
const searchCompanyResult = baseUrl + "/companies/search/engineResult";

//analyze
const totalDigitalEngagement = baseUrl + "/totalDigitalEngagement";
const industryBreakDown = baseUrl + "/industryBreakDown";
const digitalEngagementBreakDown = baseUrl + "/getDigitalFootprint";
const totalIndustry = baseUrl + "/totalIndustry";
const totalCountry = baseUrl + "/totalCountry";
const totalPersonnel = baseUrl + "/totalPersonnel";
const totalHQLocation = baseUrl + "/totalHQLocation";
const totalCompanyStaff = baseUrl + "/totalCompanyStaff";
const getEndUserTechnology = baseUrl + "/getEndUserTechnology";
const getProviderTechnology = baseUrl + "/getProviderTechnology";
const getTechnologyCountryView = baseUrl + "/getTechnologyCountryView";
const totalTechnology = baseUrl + "/totalTechnology";
const digitalPresenceFilter = baseUrl + "/digitalPresenceFilter";
const digitalEngagementSelect = baseUrl + "/digitalEngagementSelect";
const totalTechnologySelect = baseUrl + "/totalTechnologySelect";
const getOverlayData = baseUrl + "/getOverlayData";
const getCompanySurveyId = baseUrl + "/getCompanySurveyId";
const getCompanyByOverlay = baseUrl + "/getCompanyByOverlay";
const excelExport = baseUrl + "/excelExport";
const newExcelExport = baseUrl + "/newExcelExport";
const getKeywordsByCompany = baseUrl + "/getKeywordsByCompany";
const getCompanyExpertiseData = baseUrl + "/getCompanyExpertiseData";
const getCompanyClientAwardData = baseUrl + "/getCompanyClientAwardData";
const getCompanyPersonnelData = baseUrl + "/getCompanyPersonnelData";
const getUserTechnologyData = baseUrl + "/getUserTechnologyData";
const getCompanyNames = baseUrl + "/getCompanyNames";
const getTotalPartners = baseUrl + "/getTotalPartners";
const getTotalExpertise = baseUrl + "/getTotalExpertise";
const getCompanyNamesExpertise = baseUrl + "/getCompanyNamesExpertise";
const getTotalCategory = baseUrl + "/getTotalCategory";
const getTotalYearInOperation = baseUrl + "/getTotalYearInOperation";
const getTotalEmpSize = baseUrl + "/getTotalEmpSize";
const getTotalDigitalEngagement = baseUrl + "/getTotalDigitalEngagement";
const getTotalProductService = baseUrl + "/getTotalProductService";
const getYearIOByRange = baseUrl + "/getYearIOByRange";
const getMaxYearIO = baseUrl + "/getMaxYearIO";
const getEmpSizeByRange = baseUrl + "/getEmpSizeByRange";
const getMaxEmpSize = baseUrl + "/getMaxEmpSize";

//subscription
const subscription = baseUrl + "/subscription";

//upload
const fileupload = baseUrl + "/upload/quesResp";
const uploadCompanies = baseUrl + "/upload/companies";
const uploadTechno = baseUrl + "/upload/techno";
const uploadCompanyExcel = baseUrl + "/upload/uploadCompanyExcel";
const importUploadedCompanyExcel =
  baseUrl + "/upload/importUploadedCompanyExcel";
const importTechnology = baseUrl + "/upload/importTechnology";
const uploadExpertise = baseUrl + "/upload/uploadExpertise";
const importExpertise = baseUrl + "/upload/importExpertise";
const uploadExpertiseExcel = baseUrl + "/upload/uploadExpertiseExcel";
const uploadTechnoExcel = baseUrl + "/upload/uploadTechnoExcel";
const uploadClientTechnoExcel = baseUrl + "/upload/uploadClientTechnoExcel";
const uploadClientTechno = baseUrl + "/upload/uploadClientTechno";
const importClientTechno = baseUrl + "/upload/importClientTechno";
const uploadDirectory = baseUrl + "/upload/uploadDirectory";
const importDirectory = baseUrl + "/upload/importDirectory";
const uploadPersonnel = baseUrl + "/upload/uploadPersonnel";
const importPersonnel = baseUrl + "/upload/importPersonnel";
const uploadClient = baseUrl + "/upload/uploadClient";
const importClient = baseUrl + "/upload/importClient";
const uploadNameChanges = baseUrl + "/upload/uploadNameChanges";
const companyColumnCreate = baseUrl + "/upload/companyColumnCreate";
//Favourite
const createList = baseUrl + "/createList";
const addCompToFavList = baseUrl + "/addCompToFavList";
const getFavListCount = baseUrl + "/getListCount";
const setDefaultFavList = baseUrl + "/setDefaultFavList";
const removeDefaultFavList = baseUrl + "/removeDefaultFavList";
const getDefaultFavList = baseUrl + "/getDefaultFavList";
const getLatestFavListId = baseUrl + "/getLatestFavListId";
const setDefaultFavListByLastId = baseUrl + "/setDefaultFavListByLastId";
const deleteListById = baseUrl + "/deleteListById";

//config score
const createScoreList = baseUrl + "/createScoreList";
const getScoreListCount = baseUrl + "/getScoreListCount";
const getConfigDataById = baseUrl + "/getConfigDataById";
const deleteScoreListById = baseUrl + "/deleteScoreListById";
const addConfigToScoreList = baseUrl + "/addConfigToScoreList";
const getDefaultScoreList = baseUrl + "/getDefaultScoreList";

//consolidated excel upload
const getRespondent = baseUrl + "/getRespondentSummary";
const getQuestionRespondent = baseUrl + "/getQuestionRespondent";
const getExcelFileNames = baseUrl + "/getExcelFileNames";

//QC Checker
const getCheckerByLastAssign = baseUrl + "/getCheckerByLastAssign";
const getCheckerCounts = baseUrl + "/getCheckerCounts";
const checkerUpdate = baseUrl + "/checkerUpdate";
export default {
  baseUrl,
  Login,
  Reset,
  ResetPassword,
  getAllCompanies,
  getCompanyByFilter,
  searchCompanies,
  getAllDatasets,
  getCompanyByName,
  deleteCompany,
  deleteAllCompanies,
  getAllLocations,
  getGeoData,
  getFilenames,
  getCompanyByMultiIDs,
  searchCompany,
  searchCompanyStatus,
  searchCompanyResult,
  totalDigitalEngagement,
  industryBreakDown,
  digitalEngagementBreakDown,
  totalIndustry,
  totalCountry,
  totalPersonnel,
  totalHQLocation,
  totalCompanyStaff,
  getEndUserTechnology,
  getProviderTechnology,
  getTechnologyCountryView,
  totalTechnology,
  digitalPresenceFilter,
  digitalEngagementSelect,
  totalTechnologySelect,
  subscription,
  UserCreate,
  GetUsers,
  fileupload,
  getRespondent,
  getQuestionRespondent,
  getExcelFileNames,
  userIds,
  confirmUser,
  GetUserEmail,
  getOverlayData,
  getCompanySurveyId,
  getCompanyByOverlay,
  excelExport,
  newExcelExport,
  getFileNamesFromDB,
  uploadCompanies,
  uploadTechno,
  updateFileNamesFromDB,
  updateScore,
  getKeywordsByCompany,
  uploadCompanyExcel,
  importUploadedCompanyExcel,
  importTechnology,
  uploadExpertise,
  importExpertise,
  uploadExpertiseExcel,
  uploadTechnoExcel,
  uploadClientTechnoExcel,
  uploadClientTechno,
  importClientTechno,
  uploadDirectory,
  importDirectory,
  uploadPersonnel,
  importPersonnel,
  uploadClient,
  importClient,
  getCompanyExpertiseData,
  getCompanyClientAwardData,
  getCompanyPersonnelData,
  getUserTechnologyData,
  getCompanyNames,
  getTotalPartners,
  getTotalExpertise,
  getTotalCategory,
  getTotalYearInOperation,
  getTotalEmpSize,
  getTotalDigitalEngagement,
  getTotalProductService,
  getCompanyNamesExpertise,
  createList,
  addCompToFavList,
  getFavListCount,
  setDefaultFavList,
  removeDefaultFavList,
  getDefaultFavList,
  getLatestFavListId,
  setDefaultFavListByLastId,
  deleteListById,
  getYearIOByRange,
  getMaxYearIO,
  getEmpSizeByRange,
  getMaxEmpSize,
  createScoreList,
  getScoreListCount,
  getConfigDataById,
  deleteScoreListById,
  addConfigToScoreList,
  getDefaultScoreList,
  getCheckerByLastAssign,
  getCheckerCounts,
  checkerUpdate,
  uploadNameChanges,
  companyColumnCreate,
};
