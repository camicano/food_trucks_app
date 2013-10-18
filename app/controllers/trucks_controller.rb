class TrucksController < ApplicationController
	require 'open-uri'

	def index
		@response = Truck.all
		@user = current_user
		@response.sort!

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
		current_user.trucks << @truck
		redirect_to root_path
	end

	def edit
		truck = current_user.trucks.first
		@truck = Truck.find(truck.id)
	end

	def update
		truck = current_user.trucks.first
		Truck.update(truck.id, params[:truck])
		redirect_to root_path
	end

	def show
		truck = current_user.trucks.first
		@truck = Truck.find(truck.id)
	end

	def ajax
		truck = Truck.find_by_name(params[:name])
		respond_to do |format|
			format.json { render :json => truck.to_json }
		end	

	end
end
