import type * as toast from "@zag-js/toast";

export const useToast = () => {
  const nuxtApp = useNuxtApp();
  const store = nuxtApp.$toastStore as toast.Store;

  const save = () => {
    store.create({
      description: nuxtApp.$i18n.t("notification.save"),
      type: "success"
    });
  };

  const switchResume = (msg: string) => {
    store.create({
      description: nuxtApp.$i18n.t("notification.switch", { msg }),
      type: "info"
    });
  };

  const deleteResume = (msg: string) => {
    store.create({
      description: nuxtApp.$i18n.t("notification.delete", { msg }),
      type: "error"
    });
  };

  const newResume = () => {
    store.create({
      description: nuxtApp.$i18n.t("notification.new"),
      type: "success"
    });
  };

  const duplicate = (msg: string) => {
    store.create({
      description: nuxtApp.$i18n.t("notification.duplicate", {
        old: msg,
        new: msg + " Copy"
      }),
      type: "success"
    });
  };

  const correct = (msg: true | number) => {
    if (msg === true) {
      store.create({
        description: nuxtApp.$i18n.t("notification.correct.no"),
        type: "info"
      });
    } else {
      store.create({
        description: nuxtApp.$i18n.t("notification.correct.yes", { num: msg }),
        type: "success"
      });
    }
  };

  const importResume = (msg: boolean) => {
    if (msg) {
      store.create({
        description: nuxtApp.$i18n.t("notification.import.yes"),
        type: "success"
      });
    } else {
      store.create({
        description: nuxtApp.$i18n.t("notification.import.no"),
        type: "error"
      });
    }
  };

  return {
    save,
    switch: switchResume,
    delete: deleteResume,
    new: newResume,
    duplicate,
    correct,
    import: importResume
  };
};
