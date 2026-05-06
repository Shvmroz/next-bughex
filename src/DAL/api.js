import { invokeApi } from "@/config/invokeApi";

export const api_blogs_list = () => {
    const requestObj = {
        path: `api/blogs`,
        method: "GET"
    };
    return invokeApi(requestObj);
};

export const api_projects_list = () => {
    const requestObj = {
        path: `api/projects`,
        method: "GET"
    };
    return invokeApi(requestObj);
};

export const detail_project = (id) => {
    const requestObj = {
        path: `api/projects/${id}`,
        method: "GET"
    };
    return invokeApi(requestObj);
};

