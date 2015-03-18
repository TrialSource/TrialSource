class CreateTrials < ActiveRecord::Migration
  def change
    create_table :trials do |t|
      t.string :name
      t.string :condition
      t.text :description
      t.string :location
      t.date :start_on
      t.date :estimated_completed_on
      t.integer :number_of_views
      t.integer :number_of_appearances
      t.integer :doctor_id

      t.timestamps null: false
    end
  end
end
