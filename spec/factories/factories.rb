FactoryGirl.define do
  factory :trial do
    name "Diabetes Study"
    description "This is a diabetes study"
    location "Raleigh, NC"
    primary_contact_email "bill@example.com"
    principal "Bill Smith"
    active true

    factory :trial_with_condition do
      after(:create) do |trial|
        create(:condition, trials: [trial])
      end
    end
  end

  factory :condition do
    name "diabetes"
  end

  factory :notification do
    email "user@email.com"
    condition "asthma"
    exclusion_ids "2"
  end

  factory :login do
    email "user@email.com"
    password "password"
  end

  factory :doctor do
    first_name "Bill"
    last_name "Smith"
  end
end
