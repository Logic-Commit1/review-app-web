import { getRecord, getRecords, insertRecord } from '@/utils/helpers/data';

export interface Share {
  code: string;
  created_at: string;
  business_id: string;
}

/**
 * Creates a new share record.
 * @param share - The share data to insert.
 * @returns The created share or null if insertion failed.
 */
export const createShare = (share: Share) =>
  insertRecord<Share>('shares', share);

/**
 * Retrieves a share by its code.
 * @param code - The code of the share.
 * @returns The share or null if not found.
 */
export const getShareByCode = (code: string) =>
  getRecord<Share>('shares', 'code', code);

/**
 * Retrieves all shares associated with a specific business ID.
 * @param business_id - The ID of the business.
 * @returns An array of shares.
 */
export const getSharesByBusinessId = (business_id: string) =>
  getRecords<Share>('shares', 'business_id', business_id);

/**
 * Retrieves the business ID associated with a specific share code.
 * @param code - The code of the share.
 * @returns The business ID or null if not found.
 */
export const getBusinessIdByShareCode = async (
  code: string
): Promise<string | null> => {
  const share = await getRecord<Pick<Share, 'business_id'>>(
    'shares',
    'code',
    code.toLowerCase()
  );
  return share?.business_id ?? null;
};
