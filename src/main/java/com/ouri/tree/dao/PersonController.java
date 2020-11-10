package com.ouri.tree.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ouri.tree.Person;
import com.ouri.tree.ResourceNotFoundException;



@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private FamilyRepo familyRepo;
    
   // @Autowired
   // private SessionFactory sessionFactory;

    // get all persons
    @GetMapping
    public List < Person > getAllPersons() {
        return this.familyRepo.findAll();
    }

    // get person by id
    @GetMapping("/{id}")
    public Person getPersonById(@PathVariable(value = "id") Integer personId) {
        return this.familyRepo.findById(personId)
            .orElseThrow(() -> new ResourceNotFoundException("Person not found with id :" + personId));
    }
    
    @GetMapping("/i")
    public Person getPersonById() {
    	System.out.println("getPersonById ");
    	//FamilyRepoImpl fri = new FamilyRepoImpl();
    	return familyRepo.getSingle(726);
    	//return new ArrayList<Person>();
    }
    
    @GetMapping("/ids/{ids}")
    public List<Person> getPersonsByIds(@PathVariable(value = "ids") List<Integer> ids) {
    	System.out.println("getPersonsByIds "+ids);
    	
    	return familyRepo.getSelected(ids);
    	//return this.familyRepo.findByIds(ids);
        //return this.familyRepo.findById(personId)
           // .orElseThrow(() -> new ResourceNotFoundException("Person not found with id :" + personId));
    	/*
    	Session session = sessionFactory.openSession();
        Transaction tx = session.getTransaction();
        try {
            tx.begin();
            Query<Person> query = session.createQuery("from Person where firstName='Nissim'");
            List<Person> empList = query.list();
            System.out.println("Employees found: " + empList.size());
            for(Person emp: empList) {
                session.delete(emp);
                System.out.println("Deleted " + emp);
            }
            tx.commit();
             
            System.out.println("Create new employee Joe");
            tx = session.getTransaction();
            tx.begin();
            Person emp = new Person();
            emp.setFirstName("Joe");
            session.saveOrUpdate(emp);
            tx.commit();
             
            query = session.createQuery("from Person where firstName='Joe'");
            System.out.println("List all employees: " + query.list());
            return query.list();
        } catch (RuntimeException e) {
            tx.rollback();
            throw e;
 
        } finally {
            session.close();
            return null;
        }
       */
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        //this.sessionFactory = sessionFactory;
    }
    // create Person
    @PostMapping
    public Person createPerson(@RequestBody Person person) {
        return this.familyRepo.save(person);
    }

    // update person
    @PutMapping("/{id}")
    public Person updatePerson(@RequestBody Person person, @PathVariable("id") Integer personId) {
        Person existingPerson = this.familyRepo.findById(personId)
            .orElseThrow(() -> new ResourceNotFoundException("Person not found with id :" + personId));
        existingPerson.setFirstName(person.getFirstName());
        existingPerson.setFamilyName(person.getFamilyName());
        
        return this.familyRepo.save(existingPerson);
    }

    // delete person by id
    @DeleteMapping("/{id}")
    public ResponseEntity < Person > deletePerson(@PathVariable("id") Integer personId) {
        Person existingPerson = this.familyRepo.findById(personId)
        		.orElseThrow(() -> new ResourceNotFoundException("Person not found with id :" + personId));            
        this.familyRepo.delete(existingPerson);
        return ResponseEntity.ok().build();
    }
    
}
