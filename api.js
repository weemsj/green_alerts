/*
  Filename: api.js
  Description: misc. environmental variable bindings for API
*/

// This is the droplet public IP
export const API_ENDPOINT = 'http://161.35.231.54'

export const tipStoreKey = '@GreenAlertsStoreAlerts'

export async function getTips() {
  // make api request for tips
  const response = await fetch(`${API_ENDPOINT}/getTips`)
  return response.json()
}