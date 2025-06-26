import { selector } from "recoil";
import { authState } from "@/state/auth/atoms";
import { onValue, ref } from "firebase/database";
import { database } from "@/services/firebase";
import { toast } from "react-toastify";
import { Installment } from "@/types/installment";

export const installmentsListState = selector({
  key: `installmentsListState`,

  get: ({ get }): Installment[] => {
    try {
      const { id } = get(authState);

      if (!id) return [];

      const refinstallmentsIds = ref(database, `user-installments-ids/${id}`);

      let installmentsIds: string[] = [];

      onValue(refinstallmentsIds, (snapshot) => {
        const data = snapshot.val();

        if (!snapshot.val()) {
          installmentsIds = [];
          return;
        }

        installmentsIds = [];
      });

      const refInstallments = ref(database, `installments`);

      let installments: Installment[] = [];

      onValue(refInstallments, (snapshot) => {
        if (!snapshot.val()) {
          installments = [];
          return;
        }
        const data = snapshot.val() as Record<string, any>;

        installments = Object.entries(data).map(([key, value]) => ({
          id: key,
          tasks: value.tasks || [],
          ...value,
        }));
      });

      return installments;
    } catch (err) {
      const error = err as Record<string, string>;
      toast.error(error.message);
      return [];
    }
  },
});
