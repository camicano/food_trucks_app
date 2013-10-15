class TrucksController < ApplicationController
	require 'open-uri'

	def index
		@response = Truck.all

		respond_to do |format|
			format.html
			format.json {render :json => @response.to_json}
		end	
	end

	def filter
		@response = Food.all 

		respond_to do |format|
			format.json {render :json => @response.to_json}
		end	
	end
end
