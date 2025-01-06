import useGetAllSubCategories from "../../../Hook/GetDataHook/useGetAllSubCategories";

const Suggestion = ({params}) => {
    const subcategories = useGetAllSubCategories({
        query: `slug=${params}`,
    });
    console.log("subcategories",subcategories)
    return (
        <div>
            <p>{subcategories.length}</p>
        </div>
    );
};

export default Suggestion;