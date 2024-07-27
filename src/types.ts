export interface ApiCategory {
  type: string;
  name: string;
}

export interface Category extends ApiCategory {
  id: string;
}

export interface ApiCategories {
  [id: string]: ApiCategory;
}

export interface ApiTransaction {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
  type: 'income' | 'expense';
}

export interface TransactionMutation {
  type: string;
  category: string;
  amount: string;
}

export interface MergedTransaction extends ApiTransaction {
  categoryName: string;
}
