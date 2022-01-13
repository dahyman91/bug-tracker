Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :tickets
    resources :roles
    resources :projects
    resources :comments
    resources :memberships
    resources :teams, only: %i[index create]
    post '/login', to: 'sessions#create'
    get '/auth', to: 'users#show'
    get '/me', to: 'users#show'
    delete '/logout', to: 'sessions#destroy'
    post '/signup', to: 'users#create'
  end
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
