import { ref } from "vue";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../helpers/local-storage.helper";
import { client } from "../sanity";
import { type PageSettings } from "../resources/interfaces/sanity.types";

const LOCALSTORAGE_KEY = "pageSeo";

const pageSeos = ref<Array<PageSettings>>([] as Array<PageSettings>);

export function usePageSeo() {
  async function getAllPageSeo() {
    const cachedPageSeo =
      getFromLocalStorage<Array<PageSettings>>(LOCALSTORAGE_KEY);
    if (cachedPageSeo) {
      pageSeos.value = cachedPageSeo;

      return pageSeos.value;
    }

    pageSeos.value = await client.fetch(`* [_type == "pageSettings"]`);
    if (pageSeos.value) saveToLocalStorage(pageSeos.value, LOCALSTORAGE_KEY);

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
    if (!pageSeos.value) {
      const pageSeo = await client.fetch(
        `* [_type == "pageSettings" && page === ${pageKey}][0]`
      );
      return pageSeo;
    } else {
      //look in the saved data
      const pageSeo = pageSeos.value?.find((p) => {
        if (p.page === pageKey) return p;
      });

      return pageSeo as PageSettings;
    }
  }

  return {
    getAllPageSeo,
    getPageSeoByPage,
  };
}
