FoodTruckApp::Application.routes.draw do
	devise_for :users, :controllers => { :sessions => "users/sessions", :registrations => "users/registrations" }
	root :to => 'trucks#index'

	get '/trucks', :to => 'trucks#index'
	get '/foods', :to => 'foods#index'

	get '/trucks/ajax/:name', :to => 'trucks#ajax'
	get '/trucks/new', :to => 'trucks#new', :as => 'new_truck'
	post '/trucks', :to => 'trucks#create', :as => 'create'
	put '/trucks/:id', :to => 'trucks#update', :as => 'update'
	get '/trucks/edit', :to => 'trucks#edit', :as => 'edit_truck'
	delete '/trucks/:id/destroy', :to => 'trucks#destroy', :as => 'destroy'
	get '/trucks/show', :to => 'trucks#show', :as => 'truck'
end
