class TrucksController < ApplicationController
	require 'open-uri'

	def index
		@response = Truck.all

		respond_to do |format|
			format.html
			format.json {render :json => @response.to_json}
		end	
	end
end
