Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :tickets
    resources :roles
    resources :projects
    resources :comments
    resources :memberships
    resources :teams, only: %i[index create show]
    post '/login', to: 'sessions#create'
    get '/auth', to: 'users#show'
    get '/me', to: 'users#show'
    delete '/logout', to: 'sessions#destroy'
    post '/signup', to: 'users#create'
    get '/make_admin/:user_id/:team_id', to: 'memberships#make_admin'
    get '/remove_admin/:user_id/:team_id', to: 'memberships#remove_admin'
    get '/check_admin/:user_id/:team_id', to: 'memberships#check_admin'
    get '/destroy_membership/:user_id/:team_id/', to: 'memberships#remove'
  end
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
