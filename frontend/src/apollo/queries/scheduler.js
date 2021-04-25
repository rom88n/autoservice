import gql from 'graphql-tag';

export const GET_SCHEDULER_DATA = gql`
query ($startDate: String!, $endDate: String!) {
   getSchedulerData (startDate: $startDate, endDate: $endDate) {
     result {
      id
      title
      startDate
      endDate
    }
  }
}
`;
