import { useEffect,useState } from 'react';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

export default function useRespondentsHook(selectedExcelName) {

    const [respondent,setRespondent] = useState()
    const [questionRespondent, setQuestionRespondent] = useState()
    // const [overlay, setOverlay] = useState()
    const [state, dispatch] = useAppValue()

    useEffect(() => {
        async function getRespondent() {
            const response = await api().get(endpoints.getRespondent + "?excelname=" + selectedExcelName);
            // const response = await api().get(`${endpoints.getRespondent}?excelname=${selectedExcelName}`);
            if (response.status === 200) {
                // dispatch({ type: "setExcelName", excelname: selectedExcelName });
                setRespondent(response.data.data)
            }
        }

        async function getQuestionRespondent() {
            const response = await api().get(endpoints.getQuestionRespondent+ "?excelname=" + selectedExcelName);
            if (response.status === 200) {
                // dispatch({ type: "setExcelName", excelname: selectedExcelName });
                setQuestionRespondent(response.data.data)
            }
        }

        // async function getOverlayData() {
        //     const response = await api().post(endpoints.getOverlayData+ "?excelname=" + selectedExcelName);
        //     if (response.status === 200) {
        //         // dispatch({ type: "setExcelName", excelname: selectedExcelName });
        //         setOverlay(response.data.data)
        //     }
        // }
        getRespondent()
        getQuestionRespondent()
        // getOverlayData()
    }, [selectedExcelName]);

    return [respondent,questionRespondent]
};

