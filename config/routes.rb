FoodTruckApp::Application.routes.draw do
	
	# Devise routes 
	devise_for :users, :controllers => { :sessions => "users/sessions", :registrations => "users/registrations" }
	
	# Root_path
	root :to => 'trucks#index'

	# Json formats
	get '/trucks', :to => 'trucks#index'
	get '/trucks/ajax/:name', :to => 'trucks#ajax'
	get '/trucks/show', :to => 'trucks#show', :as => 'truck'

	# CRUD for creating trucks
	get '/trucks/new', :to => 'trucks#new', :as => 'new_truck'
	post '/trucks', :to => 'trucks#create', :as => 'create'
	put '/trucks/:id', :to => 'trucks#update', :as => 'update'
	get '/trucks/edit', :to => 'trucks#edit', :as => 'edit_truck'
	delete '/trucks/:id/destroy', :to => 'trucks#destroy', :as => 'destroy'
	
	# Json for food types
	get '/foods', :to => 'foods#index'
end
