import { invokeApi } from "@/config/invokeApi";

export const api_blogs_list = () => {
    const requestObj = {
        path: `api/blogs`,
        method: "GET"
    };
    return invokeApi(requestObj);
};

export const api_blog_detail = (slug) => {
    const requestObj = {
        path: `api/blogs/slug/${slug}`,
        method: "GET"
    };
    return invokeApi(requestObj);
};

export const api_services_list = () => {
    const requestObj = {
        path: `api/services`,
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

export const api_project_detail = (id) => {
    const requestObj = {
        path: `api/projects/${id}`,
        method: "GET"
    };
    return invokeApi(requestObj);
};

export const api_contact_us = (postData) => {
    const requestObj = {
        path: `api/contact-us`,
        method: "POST",
        postData
    };
    return invokeApi(requestObj);
};



