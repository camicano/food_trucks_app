class TrucksController < ApplicationController
	require 'open-uri'

	def index
		@response = Truck.all

		respond_to do |format|
			format.html
			format.json {render :json => @response.to_json}
		end	
	end

	def new
		@truck = Truck.new
	end

	def create
		@truck = Truck.create(params[:truck])
	end

	def edit
		@truck = Truck.find(params[:id])
	end

	def update
		@truck = Truck.update(params[:id], params[:truck])
	end

	def show
		@truck = Truck.find(params[:id])
	end
end
