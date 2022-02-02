import noteChangeLogs from "../../data/noteChangeLogs.json";
import { v4 as uuidv4 } from "uuid";
import useGeneralizedCrudMethod from "../useGeneralizedCrudMethod";

function useEntityNoteChangeLogs() {
    const { data, error, createRecord } =
    useGeneralizedCrudMethod(noteChangeLogs);

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
