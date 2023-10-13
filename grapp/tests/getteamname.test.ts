import { getTeamName } from '../redemption/redemptioncontroller';

const mockPoolQuery = jest.fn();

const mockPool = {
    query: mockPoolQuery
};

describe("getTeamName", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call pool.query with the correct SQL query and parameters', async () => {
        const staff_pass_id = 'yeoweihng';

        const mockQueryResult = {
            rows: [
                {
                    team_name: staff_pass_id,
                    created_at: '2023-10-11 18:45:35.275456'
                }
            ]
        };

        mockPoolQuery.mockResolvedValueOnce(mockQueryResult);

        const result = await getTeamName(mockPool, staff_pass_id);
        
        expect(mockPoolQuery).toHaveBeenCalledWith(
            `SELECT team_name, created_at
            FROM Mapping
            WHERE staff_pass_id = $1`,
            [staff_pass_id]
        );

        expect(result).toEqual(staff_pass_id);
    });
});