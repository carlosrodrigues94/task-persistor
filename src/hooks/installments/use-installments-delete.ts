import { database } from "@/services/firebase";
import { authState } from "@/state/auth/atoms";
import { installmentsListState } from "@/state/installments/list/atoms";
import { loadingState } from "@/state/loading/atoms";
import { get, ref, remove, set } from "firebase/database";
import {
  useRecoilRefresher_UNSTABLE as useRecoilRefresher,
  useRecoilState,
} from "recoil";

export const useInstallmentsDelete = () => {
  const [user] = useRecoilState(authState);
  const refresh = useRecoilRefresher(installmentsListState);
  const [, setLoading] = useRecoilState(loadingState);

  const handleDeleteInstallment = async (installmentId: string) => {
    if (!user.id) return;

    setLoading(true);

    const refInstallments = ref(database, `installments/${installmentId}`);
    const refIds = ref(database, `user-installments-ids/${user.id}`);

    await remove(refInstallments);

    const idsSnapshot = await get(refIds);
    const previousIds: string[] = idsSnapshot.exists() ? idsSnapshot.val() : [];
    const updatedIds = previousIds.filter((id) => id !== installmentId);

    await set(refIds, updatedIds);

    refresh();
    setLoading(false);
  };

  return { handleDeleteInstallment };
};
