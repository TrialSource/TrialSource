Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :doctors do
        collection do
          get :org
        end
      end
      resources :organizations
      resources :conditions
      resources :trials do
        collection do
          get :doctor
          get :org
        end
      end
      resources :archives
      resources :sessions, only: [:create, :destroy]
      resource :search, only: [:show]
    end
  end
  resources :pages
  root 'pages#index'
end
