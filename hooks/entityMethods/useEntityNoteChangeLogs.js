import { v4 as uuidv4 } from "uuid";
import useGeneralizedCrudMethod from "../useGeneralizedCrudMethod";

function useEntityNoteChangeLogs(url,errorNotificationFn) {
    const { data, error, createRecord } =
    useGeneralizedCrudMethod(url,errorNotificationFn);

    function createNoteChangeLogsEntity(noteId,operation) {
        createRecord({
            id: uuidv4(),
            noteId,
            operation,
            changeDate: new Date().toISOString(),
          });
    }

    return {data,error, createNoteChangeLogsEntity};
}

export default useEntityNoteChangeLogs;
