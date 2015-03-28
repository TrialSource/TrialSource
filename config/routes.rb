Rails.application.routes.draw do
  namespace :api, :defaults => { format: "json" } do
    namespace :v1 do
      resources :doctors do
        collection do
          get :org
        end
      end
      resources :organizations
      resources :conditions do
        collection do
          get :trials
        end
      end
      resources :trials do
        member do
          post :views
        end
        collection do
          get :doctor
          get :org
        end
      end
      resources :data do
        collection do
          get :org
        end
      end
      resources :exclusions
      resources :archives
      resources :sessions, only: [:create]
      delete 'logout' => 'sessions#destroy'
      resource :search, only: [:show]
      resources :notifications
    end
  end
  resources :pages
  root 'pages#index'
end
