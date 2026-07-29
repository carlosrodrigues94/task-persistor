import { selector } from "recoil";
import { authState } from "@/state/auth/atoms";
import { get as getFirebase, ref } from "firebase/database";
import { database } from "@/services/firebase";
import { Installment } from "@/types/installment";

export const installmentsListState = selector({
  key: `installmentsListState`,

  get: async ({ get }): Promise<Installment[]> => {
    const { id } = get(authState);

    if (!id) return [];

    const idsSnapshot = await getFirebase(
      ref(database, `user-installments-ids/${id}`)
    );

    if (!idsSnapshot.exists()) return [];

    const installmentIds: string[] = idsSnapshot.val() ?? [];

    const installments = await Promise.all(
      installmentIds.map(async (installmentId) => {
        const snapshot = await getFirebase(
          ref(database, `installments/${installmentId}`)
        );

        if (!snapshot.exists()) return null;

        const value = snapshot.val();

        return {
          id: installmentId,
          ...value,
        } as Installment;
      })
    );

    return installments.filter(
      (installment): installment is Installment => installment !== null
    );
  },
});
