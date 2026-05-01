export interface LoginModalContext {
  articleTitle: string;
}

const STORAGE_KEYS = {
  isOpen: "authModal.isOpen",
  articleTitle: "authModal.articleTitle",
} as const;

export function useAuthModal() {
  const isOpen = useState<boolean>(STORAGE_KEYS.isOpen, () => false);
  const articleTitle = useState<string | null>(
    STORAGE_KEYS.articleTitle,
    () => null,
  );

  function openAuthModal() {
    isOpen.value = true;
  }

  function closeAuthModal() {
    isOpen.value = false;
  }

  function setArticleTitle(value: string | null) {
    articleTitle.value = value;
  }

  function clearArticleTitle() {
    articleTitle.value = null;
  }

  return {
    isOpen: readonly(isOpen),
    articleTitle: readonly(articleTitle),
    openAuthModal,
    closeAuthModal,
    setArticleTitle,
    clearArticleTitle,
  };
}
