import { selector } from "recoil";
import { authState } from "@/state/auth/atoms";
import { onValue, ref } from "firebase/database";
import { database } from "@/services/firebase";
import { toast } from "react-toastify";
import { ICard } from "@/types/card";

export const cardsListState = selector({
  key: `cardsListState`,

  get: ({ get }): ICard[] => {
    try {
      const { id } = get(authState);

      if (!id) return [];
      const refCardsIds = ref(database, `user-cards-ids/${id}`);

      let cardsIds: string[] = [];

      onValue(refCardsIds, (snapshot) => {
        const data = snapshot.val();

        console.log("CARDS IDS => ", data);

        if (!snapshot.val()) {
          cardsIds = [];
          return;
        }

        cardsIds = [];
      });

      const refCards = ref(database, `cards`);

      let cards: ICard[] = [];

      onValue(refCards, (snapshot) => {
        if (!snapshot.val()) {
          cards = [];
          return;
        }
        const data = snapshot.val() as Record<string, any>;
        cards = Object.entries(data).map(([key, value]) => ({
          id: key,
          tasks: value.tasks || [],
          ...value,
        }));
      });

      console.log("CARDS INSIDE RECOIL", cards);

      return cards;
    } catch (err) {
      const error = err as Record<string, string>;
      toast.error(error.message);
      return [];
    }
  },
});
