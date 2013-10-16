class TrucksController < ApplicationController
	require 'open-uri'

	def index
		@response = Truck.all

		respond_to do |format|
			format.html
			format.json {render :json => @response.to_json}
		end	
	end

	def tweets
		tweet = params[:tweet1].split('.')
		truck_tweet = Truck.find_by_tweet1(tweet[0])
		@trucks = truck_tweet.trucks

		respond_to do |format|
			format.json { render :json => @trucks.to_json}
		end
	end
end
