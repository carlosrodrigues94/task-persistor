import { authState } from "@/state/auth/atoms";
import { loadingState } from "@/state/loading/atoms";
import { get, ref, set } from "firebase/database";
import { useRecoilRefresher_UNSTABLE, useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";
import { database } from "@/services/firebase";
import { installmentsListState } from "@/state/installments/list/atoms";
import { Installment } from "@/types/installment";
import { MODALS } from "@/constants/modals";
import { modalsState } from "@/state/modals/atoms";

export const useInstallmentsCreate = () => {
  const [user] = useRecoilState(authState);
  const [_, setModalOpen] = useRecoilState(modalsState);
  const [, setLoading] = useRecoilState(loadingState);
  const refresh = useRecoilRefresher_UNSTABLE(installmentsListState);

  const handleCreateInstallment = async (data: Omit<Installment, "id">) => {
    setLoading(true);
    const id = uuid();

    const refIds = ref(database, `user-installments-ids/${user.id}`);
    const refInstallments = ref(database, `installments/${id}`);
    const ids = await get(refIds);

    let previousIds = [];

    if (ids.exists()) {
      previousIds = ids.val();
    }

    await set(refIds, [...new Set([...previousIds, id])]);

    await set(refInstallments, { id, ...data, createdAt: new Date() });

    refresh();

    setLoading(false);
  };

  const handleClickAddNewInstallment = () => {
    setModalOpen(MODALS.ADD_NEW_INSTALLMENT);
  };

  return { handleCreateInstallment, handleClickAddNewInstallment };
};
