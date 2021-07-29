import { data } from "jquery";

/* eslint-disable no-lone-blocks */
export const initialState = {
  company: {
    page: 1,
    lists: [],
    count: 0,
    activeIndex: null,
    loading: true,
    listLoading: false,
  },
  selectedCompany: {
    page: 1,
    lists: [],
    count: 0,
    activeIndex: null,
    loading: true,
  },
  surveyCompany: {
    page: 1,
    lists: [],
    count: 0,
    activeIndex: null,
    loading: true,
  },
  selectedTechnologyCompany: {
    page: 1,
    lists: [],
    count: 0,
    activeIndex: null,
    loading: true,
  },
  selectedCheckerCompany: {
    page: 1,
    lists: [],
    count: 0,
    activeIndex: null,
    loading: true,
  },
  selectedDigitalEngagementCompany: {
    page: 1,
    lists: [],
    count: 0,
    activeIndex: null,
    loading: true,
  },
  totalDigitalEngagement: {
    data: [],
    dataByCountry: {},
    count: 0,
  },
  totalTechnology: {
    data: [],
  },
  totalTechnologySelect: {},
  noneTechnologyCompanyIds: [],
  noneTechnologyCompanies: [],
  digitalEngagementPageData: {
    data: {},
    digitalAssetsData: {},
    result: [],
    provider: [],
    digitalAssets: [],
  },
  IndustryBreakDown: {
    results: [],
    totalIndustries: [],
  },
  DigitalEngagementBreakDown: {
    results: [],
    totalIndustries: [],
  },
  totalIndustries: {
    industries: [],
    industryName: [],
    count: 0,
  },
  totalCountries: {
    countries: [],
    countryName: [],
    count: 0,
  },

  totalPersonnel: {
    count: 0,
    personnel: [],
    personnelName: [],
  },
  totalHQLocation: {
    count: 0,
    HQLocation: [],
    HQLocationName: [],
  },
  totalCompanyStaff: {
    count: 0,
    personnel: [],
    personnelName: [],
  },
  digitalPresence: {
    results: {},
  },

  locations: [],
  datasets: [],
  filenames: [],
  search: [],
  userCompanyFilter: [],
  userFavCompFilter: [],
  userCategoryFilter: [],
  userEmpSizeFilter: [],
  userDigitalEngagementFilter: [],
  userProductServiceFilter: [],
  userYearIOFilter: [],
  yearIORangeFilter: [{ min: "", max: "", selectValue: "-" }],
  empSizeRangeFilter: [{ min: "", max: "", selectValue: "-" }],
  userCompanyExpertiseFilter: [],
  userPartner: [],
  userSubPartner: [],
  userExpertise: [],
  snackbar: {
    show: false,
    message: " ",
    varient: "success",
  },

  fieldType: 0,
  overviewTab: 0,
  selectedDataset: "",
  selectedFilename: "",
  selectedExcelName: "",
  route: "Company List",
  frimographicFilter: {},
  technologyFilter: {},
  // searchedBrandsFilter: {},
  restrictTechnologyFilter: {},
  sortFilter: "",
  companyPopup: false,
  companyData: {},
  breakdownType: "",
  technologyName: "",
  openFavList: false,
  _1stTimeFavComp: "",
  addedToFav: false,
  companyListReload: false,
  reloadTechnoCompany: false,
  technoCompanyIds: [],

  companyUploadFilter: {},
  companyUploadFilter2: {},
  companyUploadFilter3: {},
  companyUploadFilter4: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setCompanies":
      return {
        ...state,
        company: {
          ...state.company,
          lists: [...state.company.lists, ...action.companies],
          count: action.count,
          loading: action.loading,
        },
      };
    case "resetCompanies":
      return {
        ...state,
        company: {
          page: action.page || 1,
          lists: action.companies,
          count: action.count,
          loading: false,
          listLoading: false,
          activeIndex: null,
        },
      };
    case "setSelectedCompanies":
      return {
        ...state,
        selectedCompany: {
          ...state.selectedCompany,
          lists: [...state.selectedCompany.lists, ...action.companies],
          count: action.count,
          loading: action.loading,
        },
      };
    case "resetSelectedCompanies":
      return {
        ...state,
        selectedCompany: {
          page: 1,
          lists: action.companies,
          count: action.count,
          loading: false,
          activeIndex: null,
        },
      };
    case "setSurveyCompanies":
      return {
        ...state,
        selectedCompany: {
          ...state.selectedCompany,
          lists: [...state.selectedCompany.lists, ...action.companies],
          count: action.count,
          loading: action.loading,
        },
      };
    case "resetSurveyCompanies":
      return {
        ...state,
        selectedCompany: {
          page: 1,
          lists: action.companies,
          count: action.count,
          loading: false,
          activeIndex: null,
        },
      };
    case "setSelectedTechnologyCompanies":
      return {
        ...state,
        selectedTechnologyCompany: {
          ...state.selectedTechnologyCompany,
          lists: [
            ...state.selectedTechnologyCompany.lists,
            ...action.companies,
          ],
          count: action.count,
          loading: action.loading,
        },
      };
    case "setSelectedCheckerCompanies":
      return {
        ...state,
        selectedCheckerCompany: {
          ...state.selectedCheckerCompany,
          lists: [...state.selectedCheckerCompany.lists, ...action.companies],
          // count: action.count,
          loading: action.loading,
        },
      };
    case "resetSelectedCheckerCompanies":
      return {
        ...state,
        selectedCheckerCompany: {
          ...state.selectedCheckerCompany,
          page: 1,
          lists: action.companies,
          count: action.count,
          loading: false,
          activeIndex: null,
        },
      };
    case "resetSelectedTechnologyCompanies":
      return {
        ...state,
        selectedTechnologyCompany: {
          page: 1,
          lists: action.companies,
          count: action.count,
          loading: false,
          activeIndex: null,
        },
      };
    case "setSelectedDigitalEngagementCompanies":
      return {
        ...state,
        selectedDigitalEngagementCompany: {
          ...state.selectedDigitalEngagementCompany,
          lists: [
            ...state.selectedDigitalEngagementCompany.lists,
            ...action.companies,
          ],
          count: action.count,
          loading: action.loading,
        },
      };
    case "resetSelectedDigitalEngagementCompanies":
      return {
        ...state,
        selectedDigitalEngagementCompany: {
          page: 1,
          lists: action.companies,
          count: action.count,
          loading: false,
          activeIndex: null,
        },
      };
    case "setSortFilter":
      return {
        ...state,
        sortFilter: action.sortData,
      };
    case "setRoute":
      return {
        ...state,
        route: action.route,
      };
    case "setDatasets": {
      return {
        ...state,
        datasets: action.datasets,
        selectedDataset: action.datasets[0],
      };
    }
    case "setSelectedDataset": {
      return {
        ...state,
        selectedDataset: action.dataset,
      };
    }
    case "setFilenames": {
      return {
        ...state,
        filenames: action.filenames,
        selectedFilename: action.filenames[0],
      };
    }
    case "setSelectedFile": {
      return {
        ...state,
        selectedFilename: action.filename,
      };
    }
    case "setExcelName": {
      return {
        ...state,
        selectedExcelName: action.excelname,
      };
    }
    case "setActive":
      return {
        ...state,
        company: { ...state.company, activeIndex: action.index },
      };
    case "setPage":
      return {
        ...state,
        company: { ...state.company, page: action.page },
      };
    case "setSelectedCompanyPage":
      return {
        ...state,
        selectedCompany: { ...state.selectedCompany, page: action.page },
      };
    case "setSelectedTechnologyCompanyPage":
      return {
        ...state,
        selectedTechnologyCompany: {
          ...state.selectedTechnologyCompany,
          page: action.page,
        },
      };
    case "setSelectedCheckerCompanyPage":
      return {
        ...state,
        selectedCheckerCompany: {
          ...state.selectedCheckerCompany,
          page: action.page,
        },
      };
    case "setSelectedDigitalEngagementCompanyPage":
      return {
        ...state,
        selectedDigitalEngagementCompany: {
          ...state.selectedDigitalEngagementCompany,
          page: action.page,
        },
      };
    case "search": {
      return {
        ...state,
        search: action.companies,
      };
    }
    case "showSnackBar": {
      return {
        ...state,
        snackbar: {
          show: true,
          message: action.message,
          varient: action.varient,
        },
      };
    }
    case "closeSnackBar": {
      return {
        ...state,
        snackbar: { show: false, message: "", varient: "success" },
      };
    }
    case "setLocations": {
      return {
        ...state,
        locations: action.companies,
      };
    }
    case "setUserCompanyFilter": {
      return {
        ...state,
        userCompanyFilter: action.companies,
      };
    }
    case "setUserFavCompFilter": {
      return {
        ...state,
        userFavCompFilter: action.companies,
      };
    }
    case "setUserCategoryFilter": {
      return {
        ...state,
        userCategoryFilter: action.category,
      };
    }
    case "setUserEmpSizeFilter": {
      return {
        ...state,
        userEmpSizeFilter: action.empSize,
      };
    }
    case "setUserDigitalEngagementFilter": {
      return {
        ...state,
        userDigitalEngagementFilter: action.filter,
      };
    }
    case "setUserProductServiceFilter": {
      return {
        ...state,
        userProductServiceFilter: action.filter,
      };
    }
    case "setUserYearIOFilter": {
      return {
        ...state,
        userYearIOFilter: action.year,
      };
    }
    case "setUserCompanyExpertiseFilter": {
      return {
        ...state,
        userCompanyExpertiseFilter: action.companies,
      };
    }
    case "setUserPartnerFilter": {
      return {
        ...state,
        userPartner: action.partner,
      };
    }
    case "setUserSubPartnerFilter": {
      return {
        ...state,
        userSubPartner: action.partner,
      };
    }
    case "setUserExpertiseFilter": {
      return {
        ...state,
        userExpertise: action.expertise,
      };
    }
    case "setYearIORangeFilter": {
      return {
        ...state,
        yearIORangeFilter: action.filter,
      };
    }
    case "setEmpSizeRangeFilter": {
      return {
        ...state,
        empSizeRangeFilter: action.filter,
      };
    }
    case "loading": {
      return {
        ...state,
        company: {
          ...state.company,
          loading: true,
        },
      };
    }
    case "loadingChecker": {
      return {
        ...state,
        selectedCheckerCompany: {
          ...state.selectedCheckerCompany,
          loading: true,
        },
      };
    }
    case "listLoading": {
      return {
        ...state,
        company: {
          ...state.company,
          listLoading: false,
        },
      };
    }
    case "setTotalDigitalEngagement":
      return {
        ...state,
        totalDigitalEngagement: {
          // ...state.totalDigitalEngagement,
          data: action.data,
          dataByCountry: action.dataByCountry,
          count: action.count,
        },
      };
    case "setTotalTechnology":
      return {
        ...state,
        totalTechnology: {
          data: action.data,
        },
      };

    case "setTotalTechnologySelect":
      return {
        ...state,
        totalTechnologySelect: action.data,
        noneTechnologyCompanyIds: action.companyIds,
      };

    case "setNoneTechnologyCompanyIds": {
      return {
        ...state,
        noneTechnologyCompanies: action.companies,
      };
    }

    case "setDigitalEngagementPageData":
      return {
        ...state,
        digitalEngagementPageData: {
          data: action.data,
          results: action.results,
          provider: action.provider,
          digitalAssets: action.digitalAssets,
          digitalAssetsData: action.digitalAssetsData,
        },
      };
    case "setTotalIndustry":
      return {
        ...state,
        totalIndustries: {
          // ...state.totalIndustries,
          count: action.totalIndustries,
          industries: action.results.industries,
          industryName: action.results.industryName,
        },
      };
    case "setTotalCountry":
      return {
        ...state,
        totalCountries: {
          count: action.totalCountry,
          countries: action.country,
          countryName: action.countryName,
        },
      };
    case "setTotalPersonnel":
      return {
        ...state,
        totalPersonnel: {
          count: action.totalPersonnel,
          personnel: action.personnel,
          personnelName: action.personnelName,
        },
      };
    case "setTotalCompanyStaff":
      return {
        ...state,
        totalCompanyStaff: {
          count: action.totalCompanyStaff,
          personnel: action.personnel,
          personnelName: action.personnelName,
        },
      };
    case "setTotalHQLocation":
      return {
        ...state,
        totalHQLocation: {
          count: action.totalHQLocation,
          HQLocation: action.HQLocation,
          HQLocationName: action.HQLocationName,
        },
      };
    case "setDigitalPresence":
      return {
        ...state,
        digitalPresence: {
          results: action.results,
        },
      };
    case "setIndustryBreakDown":
      return {
        ...state,
        IndustryBreakDown: {
          // ...state.IndustryBreakDown,
          results: action.results,
          totalIndustries: action.totalIndustries,
        },
      };
    case "setDigitalEngagementBreakDown":
      return {
        ...state,
        DigitalEngagementBreakDown: {
          // ...state.DigitalEngagementBreakDown,
          results: action.results,
          count: action.count,
          // totalIndustries: action.totalIndustries
        },
      };
    case "setFrimographicFilter": {
      return {
        ...state,
        frimographicFilter: action.filter,
      };
    }
    case "setTechnologyFilter": {
      return {
        ...state,
        technologyFilter: {
          ...state.technologyFilter,
          ...action.filter,
        },
      };
    }
    // case 'setSearchedBrandsFilter': {
    //     return {
    //         ...state,
    //         searchedBrandsFilter: {
    //             ...state.searchedBrandsFilter, ...action.filter
    //         }
    //     }
    // };
    case "setRestrictTechnologyFilter": {
      return {
        ...state,
        restrictTechnologyFilter: {
          ...state.restrictTechnologyFilter,
          ...action.filter,
        },
      };
    }
    case "resetTechnologyFilter": {
      return {
        ...state,
        technologyFilter: {},
      };
    }
    case "resetRestrictTechnologyFilter": {
      return {
        ...state,
        restrictTechnologyFilter: {},
      };
    }
    // case 'setAdvertisingFilter': {
    //     return {
    //         ...state,
    //         advertisingFilter: action.filter
    //     }
    // };
    // case 'setAnalyticsFilter': {
    //     return {
    //         ...state,
    //         analyticsFilter: action.filter
    //     }
    // };
    // case 'setHosting': {
    //     return {
    //         ...state,
    //         hostingFilter: action.filter
    //     }
    // };
    // case 'setProductivity': {
    //     return {
    //         ...state,
    //         productivityFilter: action.filter
    //     }
    // };
    // case 'setEcommerceFilter': {
    //     return {
    //         ...state,
    //         ecommerceFilter: action.filter
    //     }
    // };
    // case 'setWidgetFilter': {
    //     return {
    //         ...state,
    //         widgetFilter: action.filter
    //     }
    // };
    case "setDigitalPresenceFilter": {
      return {
        ...state,
        digitalPresenceFilter: action.filter,
      };
    }
    case "setOverviewTab": {
      return {
        ...state,
        overviewTab: action.index,
      };
    }
    case "setFieldType": {
      return {
        ...state,
        fieldType: action.index,
      };
    }
    case "setEachCompanyData": {
      return {
        ...state,
        companyData: action.data,
        companyPopup: true,
      };
    }
    case "setCompanyPopup": {
      return {
        ...state,
        companyData: {},
        companyPopup: false,
      };
    }
    case "setBreakDown": {
      return {
        ...state,
        breakdownType: action.breakdownType,
        technologyName: action.name,
      };
    }
    case "setOpenFavList": {
      return {
        ...state,
        openFavList: action.condition,
        _1stTimeFavComp: action.company,
      };
    }
    case "setCompanyListReload": {
      return {
        ...state,
        companyListReload: action.condition,
      };
    }

    case "addToFav": {
      return {
        ...state,
        addedToFav: action.condition,
      };
    }

    case "setTechnoCompanyIds": {
      return {
        ...state,
        technoCompanyIds: action.ids,
      };
    }

    case "setReloadTechnoCompany": {
      return {
        ...state,
        reloadTechnoCompany: action.condition,
      };
    }

    case "setCompanyUploadFilter": {
      return {
        ...state,
        companyUploadFilter: { ...state.companyUploadFilter, ...action.filter },
      };
    }

    case "setCompanyUploadFilter2": {
      return {
        ...state,
        companyUploadFilter2: {
          ...state.companyUploadFilter2,
          ...action.filter,
        },
      };
    }

    case "setCompanyUploadFilter3": {
      return {
        ...state,
        companyUploadFilter3: {
          ...state.companyUploadFilter3,
          ...action.filter,
        },
      };
    }

    case "setCompanyUploadFilter4": {
      return {
        ...state,
        companyUploadFilter4: {
          ...state.companyUploadFilter4,
          ...action.filter,
        },
      };
    }
    case "resetCompanyUploadFilter": {
      return {
        ...state,
        companyUploadFilter: {},
      };
    }
    case "resetCompanyUploadFilter2": {
      return {
        ...state,
        companyUploadFilter2: {},
      };
    }
    case "resetCompanyUploadFilter3": {
      return {
        ...state,
        companyUploadFilter3: {},
      };
    }
    case "resetCompanyUploadFilter4": {
      return {
        ...state,
        companyUploadFilter4: {},
      };
    }
    default:
      return state;
  }
};
