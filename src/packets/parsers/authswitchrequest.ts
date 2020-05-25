import { BufferReader } from "../../buffer.ts";

/**
 * 
 */
export const Signature = 0xFE;
export interface AuthSwitchRequest {
  name: string;
  data: Uint8Array;
}

export function parseAuthSwitchRequest(
  reader: BufferReader,
): AuthSwitchRequest {
  let _ = reader.readUint8();
  let name = "";
  let data = new Uint8Array();
  if (reader.length == 1) {
    name = "mysql_old_password";
  } else {
    name = reader.readNullTerminatedString();
    data = reader.readToEnd();
  }

  return {
    name,
    data,
  };
}
