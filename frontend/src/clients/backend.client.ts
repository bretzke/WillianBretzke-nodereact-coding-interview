import axios from "axios";
import { IUserProps } from "../dtos/user.dto";

export class BackendClient {
  private readonly baseUrl: string;

  constructor(baseUrl = "http://localhost:3001/v1") {
    this.baseUrl = baseUrl;
  }

  async getAllUsers(search?: string): Promise<{ data: IUserProps[] }> {
    return (await axios.get(`${this.baseUrl}/people?search=${search ?? ""}`, {})).data;
  }

  // async searchUser(search: string): Promise<{ data: IUserProps[]}> {
  //   return (await axios.post(`${this.baseUrl}/people/search`, {
  //     search
  //   })).data
  // }
}
