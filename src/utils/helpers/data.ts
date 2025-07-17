import { supabase } from '@/utils/supabase';

/**
 * Inserts a record into the specified table.
 * @param table - The name of the table.
 * @param record - The record to insert.
 * @returns The inserted record or null if insertion failed.
 * @throws Will throw an error if the insertion fails.
 */
export const insertRecord = async <T>(
  table: string,
  record: T
): Promise<T | null> => {
  const { data, error } = await supabase
    .from(table)
    .insert(record)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error(`Error inserting into ${table}:`, error);
    throw error;
  }

  return data;
};

/**
 * Updates a record in the specified table based on a column and value.
 * @param table - The name of the table.
 * @param column - The column to match for the update.
 * @param value - The value to match in the specified column.
 * @param updates - The updates to apply.
 * @returns The updated record or null if update failed.
 * @throws Will throw an error if the update fails.
 */
export const updateRecord = async <T>(
  table: string,
  column: string,
  value: string,
  updates: Partial<T>
): Promise<T | null> => {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq(column, value)
    .select('*')
    .maybeSingle();

  if (error) {
    console.error(`Error updating ${table}:`, error);
    throw error;
  }

  return data;
};

/**
 * Retrieves a single record from the specified table based on a column and value.
 * @param table - The name of the table.
 * @param column - The column to match.
 * @param value - The value to match in the specified column.
 * @returns The retrieved record or null if not found.
 * @throws Will throw an error if the retrieval fails.
 */
export const getRecord = async <T>(
  table: string,
  column: string,
  value: string
): Promise<T | null> => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq(column, value)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching from ${table}:`, error);
    throw error;
  }

  return data;
};

/**
 * Retrieves multiple records from the specified table based on a column and value.
 * @param table - The name of the table.
 * @param column - The column to match.
 * @param value - The value to match in the specified column.
 * @returns An array of retrieved records.
 * @throws Will throw an error if the retrieval fails.
 */
export const getRecords = async <T>(
  table: string,
  column: string,
  value: string
): Promise<T[]> => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq(column, value);

  if (error) {
    console.error(`Error fetching from ${table}:`, error);
    throw error;
  }

  return data ?? [];
};

/**
 * Retrieves all records from the specified table.
 * @param table - The name of the table.
 * @returns An array of all records.
 * @throws Will throw an error if the retrieval fails.
 */
export const getAllRecords = async <T>(table: string): Promise<T[]> => {
  const { data, error } = await supabase.from(table).select('*');

  if (error) {
    console.error(`Error fetching from ${table}:`, error);
    throw error;
  }

  return data ?? [];
};
