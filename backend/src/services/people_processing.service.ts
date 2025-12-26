import people_data from '../data/people_data.json';

export class PeopleProcessing {
    getById(id: number) {
        return people_data.find((p) => p.id === id);
    }

    getAll() {
        return people_data;
    }

    searchPeople(search: string, page: number, limit: number) {
      const formattedSearch = search?.toLowerCase() || ""
      const people = people_data.filter(
        (p) => `${p.first_name} ${p.last_name}`.toLowerCase().includes(formattedSearch)
      )

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      const paginatedPeople = people.slice(startIndex, endIndex)
      
      return paginatedPeople
    }
}
