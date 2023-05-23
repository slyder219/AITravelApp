from amadeus import Client, ResponseError
import openai
import json


class amaBase():
    secret = "KaQ1vwdHt1qoo1Xg"
    key = "OA1kI1wAG1U87REBGsmgGK3mF8isPd7a"

    amadeus = Client(
        client_id= key,
        client_secret= secret
    )
ama = amaBase()

def normalFlight(ama, orgin, destination, date, max, adults):
    try:
        response = ama.amadeus.shopping.flight_offers_search.get(
            originLocationCode=orgin,
            destinationLocationCode=destination,
            departureDate=date,
            max = max,
            adults=adults)
        # with open('flight_offers_search.json', 'w') as outfile:
        #     json.dump(response.data, outfile)
        
        for item in response.data:
            print(
                item['itineraries'][0]['duration']
            )
            
            print(
                item['price']['grandTotal']
            )

            print(
                item['oneWay']
            )
            # dep from
            print(
                item['itineraries'][0]['segments'][0]['departure']['iataCode']
            )
            # dep time 
            print(
                item['itineraries'][0]['segments'][0]['departure']['at']
            )


            print()

    except ResponseError as error:
        print(error)


def main():
    normalFlight(ama, 'NYC', 'MAD', '2023-06-19', 5, 1)


if __name__ == "__main__":
    main()