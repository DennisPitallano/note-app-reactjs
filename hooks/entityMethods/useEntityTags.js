import { v4 as uuidv4 } from "uuid";
import useGeneralizedCrudMethod from "../useGeneralizedCrudMethod";

function useEntityTags(url,errorNotificationFn) {
  const { data, error, createRecord } = useGeneralizedCrudMethod(url,errorNotificationFn);

  function createTagsAndMerge(tagIdsIn, tagNamesInString) {
    if (!tagIdsIn && !tagNamesInString) return undefined;

    const tagNamesIn = tagNamesInString
      ? tagNamesInString.split(",").filter((t) => t && t.length > 0)
      : [];

    const tagIds = tagIdsIn ? [...tagIdsIn] : [];
    const tagNamesAllUppercase = data.map(r=> r.tagName.toUpperCase());
    tagNamesIn.filter(rec=> {
        return !(!rec || rec.trim().length ===0);
    }).forEach(function(tag) {
        if(tagNamesAllUppercase.includes(tag.toUpperCase())){
            const tagNameValue = tagNamesAllUppercase.find(r=>r.tag.toUpperCase());
            const id = data?.find(r=>r.tagName.toUpperCase() === tagNameValue).id;
            if (!tagIds.includes(id)) {
                tagIds.push(id);
            }
        }else{
            const tagIdNew = uuidv4();
            createRecord({
                id: tagIdNew,
                tagName : tag,
            });
            tagIds.push(tagIdNew);
        }
    });
    return tagIds;
  }

  return {data, error, createTagsAndMerge};
}

export default useEntityTags;
