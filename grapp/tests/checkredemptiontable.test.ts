import { checkRedemptionValidity } from '../redemption/redemptioncontroller';

// Mock pool.query function
const mockPoolQuery = jest.fn();

// Mock Pool object
const mockPool = {
    query: mockPoolQuery
};

describe("checkRedemptionValidity", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call pool.query with the correct SQL query and parameters', async () => {
        const teamname = 'SampleTeamName';

        // Mock response for the pool.query
        // Note that this is the output itself 
        const mockQueryResult = {
            rows: [
                {
                    team_name: teamname,
                    redeemed_at: '2023-10-14'
                }
            ]
        };

        mockPoolQuery.mockResolvedValueOnce(mockQueryResult);

        const result = await checkRedemptionValidity(mockPool, teamname);
        
        // Expecting the query to be called
        expect(mockPoolQuery).toHaveBeenCalledWith(
            `SELECT team_name, redeemed_at
            FROM Redemption
            WHERE team_name = $1`,
            [teamname]
        );

        // Assertion of result
        expect(result).toEqual(mockQueryResult);
    });
});