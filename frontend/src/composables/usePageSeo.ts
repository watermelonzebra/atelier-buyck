import { ref } from "vue";
import { client } from "../sanity";
import { type PageSettings } from "../resources/interfaces/sanity.types";

const pageSeos = ref<Array<PageSettings>>([] as Array<PageSettings>);

export function usePageSeo() {
  async function getAllPageSeo() {
    pageSeos.value = await client.fetch(`* [_type == "pageSettings"]`);

    return pageSeos.value;
  }

  async function getPageSeoByPage(page: string): Promise<PageSettings> {
    const pageKey: PageSettings["page"] =
      page === "Index"
        ? "home"
        : page === "Contact"
        ? "contact"
        : page === "Projects"
        ? "projects"
        : undefined;

    console.log(page, pageKey);

    const pageSeo = await client.fetch(
      `* [_type == "pageSettings" && page == "${pageKey}"][0]`
    );

    console.log(pageSeo)

    return pageSeo;
  }

  return {
    getAllPageSeo,
    getPageSeoByPage,
  };
}
